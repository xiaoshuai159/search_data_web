# coding=utf-8
"""
数据处理上传mysql
"""
from utils.funcs import connect_mysql, close_mysql


def database_info():
    conn, cursor = connect_mysql()
    sql = """select * from database_info order by max_time"""
    cursor.execute(sql)
    res = cursor.fetchall()
    for line in res:
        print(line)
    close_mysql(conn, cursor)


def event_():
    conn, cursor = connect_mysql()
    close_mysql(conn, cursor)


database_info()