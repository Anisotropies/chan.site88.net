import os

def rename_files():
  #(1) get file names from a folder
  file_list = os.listdir(r"C:\Users\ackch\Downloads\prank\prank")
  saved_path = os.getcwd()
  print("Current working directory is " + saved_path)
  #(2) for each file, rename filename
  print("Changing to this directory: \"C:\Users\ackch\Downloads\prank\prank\"")
  os.chdir(r"C:\Users\ackch\Downloads\prank\prank")
  for file_name in file_list:
    translated_name = file_name.translate(None, "0123456789")
    print(file_name + " changed to " + translated_name)
    os.rename(file_name, translated_name)
  os.chdir(saved_path)
  print("Changing back to this directory: " + saved_path)
  
rename_files()
