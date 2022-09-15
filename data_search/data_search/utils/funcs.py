# coding=utf-8
"""
通用函数库
"""
from pymysql import connect


def connect_mysql():
    con = connect(host="127.0.0.1", port=3306, user="root", password="590128xzp", database="database_event")
    cursor = con.cursor()
    return con, cursor


def close_mysql(con, cursor):
    cursor.close()
    con.close()


def database_info():
    pass


def operate_history():
    pass