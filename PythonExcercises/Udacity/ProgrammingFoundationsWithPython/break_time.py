import webbrowser
import time

print("This program started on " + time.ctime())
for index in range(3):
  time.sleep(1)
  webbrowser.open("https://www.youtube.com/watch?v=Q0CbN8sfihY")
print("This program ended on " + time.ctime())
