#coding = utf-8
"""
web启动函数
"""
from flask import Flask
import time
import uuid
import json
from io import BytesIO
from flask import Flask, request, session, redirect, g, url_for, make_response, send_from_directory
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from utils import verify_codes, User
from utils.funcs import connect_mysql, close_mysql

USERS = User.USERS


app = Flask(__name__, static_folder="./dist", template_folder="./dist", static_url_path="/")

app.config['SECRET_KEY'] = str(uuid.uuid4())
app.config['SESSION_PERMANENT'] = False  # session是否长期有效，false，则关闭浏览器，session失效
app.config['PERMANENT_SESSION_LIFETIME'] = 3600
CORS(app=app)


@app.before_request
def before_request():
    """
    每次请求接口之前验证当前的登录状态
    :return: None
    """
    g.user = None
    if 'user_id' in session:
        user = [u for u in USERS if u.get('id') == session['user_id']]
        g.user = user[0]


@app.route('/index', methods=['GET'])
def index():
    """
    测试主页
    :return: Hello
    """
    return app.send_static_file("index.html")


@app.route('/error', methods=['GET'])
def error():
    return json.dumps({"code": 400, "msg": "error return index"}), 600


@app.route('/verify_code')
def verify_code():
    """
    生成验证码
    :return:
    """
    image, code = verify_codes.generate_image(4)
    # 图片以二进制形式写入
    buf = BytesIO()
    image.save(buf, 'jpeg')
    buf_str = buf.getvalue()
    # 把buf_str作为response返回前端，并设置首部字段
    response = make_response(buf_str)
    response.headers['Content-Type'] = 'image/gif'
    # 将验证码字符串储存在session中
    session['imageCode'] = str.lower(code)
    print(code)
    return response


@app.route('/login_in', methods=['POST'])
def login_in():
    """
    登录接口，接收登录名后，验证密码是否正确，创建session
    :return: json格式返回
    """
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    if request.method == 'POST':
        session.pop('user_id', None)
        username = req_data['login_user']
        passwd = req_data['login_passwd']
        code = str.lower(req_data['code'])
        if code != session['imageCode']:
            return json.dumps({'code': 502, 'msg': 'failure', 'data': 'wrong verify code'}), 400
        user = User.User.queryUser(username)
        if user is not None and user.verifyPasswd(passwd):
            token = generate_csrf(str(time.time()) + user.get_id())
            login_in_rep_data = {'code': 200, 'msg': 'success'}
            login_in_rep_data.update({"user": username, "token": token})
            session['user_id'] = user.get_id()
            return json.dumps(login_in_rep_data), 200
        else:
            login_in_rep_data = {'code': 501, 'msg': 'failure', 'data': 'user or passwd wrong'}
            return json.dumps(login_in_rep_data), 400


@app.route("/search_operate_history", methods=['POST'])
def search_operate_history():
    if "user_id" not in session:
        return json.dumps({"code": 600, "msg": "用户信息过期"}), 400
    req_data = request.form
    print(req_data)
    return json.dumps({"code": 200, "msg": "success", "data": [{"event_time": "2022-09-04 09:02:13", "database_type": "Elasticsearch","status":"es登陆成功","sip":"18.183.247.190","sport":50068,"dip":"222.212.90.33","dport":9200,"d_region":"四川省","d_city":"成都市","d_district":"市辖区","d_owner":"锦江肖小儿中医门诊部"}]}, ensure_ascii=False)


@app.route("/search_database_info", methods=['POST'])
def search_database_info():
    if "user_id" not in session:
        return json.dumps({"code": 600, "msg": "用户信息过期"}), 400
    req_data = request.form
    print(req_data)
    return json.dumps({"code": 200, "msg": "success", "data": [{"dip": "118.122.125.183", "port":"9200", "min_time": "2022-09-03 04:14:53","max_time": "2022-09-03 21:23:01","s_c_boundary":"境内","c_region":"四川省","c_city":"成都市","c_district":"新都区","company":"成都市武侯区行政审批局","database_type":"ElasticSearch"}]}, ensure_ascii=False)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
