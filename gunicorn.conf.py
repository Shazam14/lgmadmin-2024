import multiprocessing

bind = "unix:/home/lgmsadmin/lgmadmin-2024/run/gunicorn.sock"
workers = multiprocessing.cpu_count() * 2 + 1
accesslog = "/home/lgmsadmin/lgmadmin-2024/logs/gunicorn.access.log"
errorlog = "/home/lgmsadmin/lgmadmin-2024/logs/gunicorn.error.log"
