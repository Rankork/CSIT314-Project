import subprocess
import copy
import sys

MIN_PYTHON = (3, 8)

if __name__ == '__main__':
    if sys.version_info < MIN_PYTHON:
        sys.exit("Python %s.%s or later is required.\n" % MIN_PYTHON)

    image_names = ["backend", "frontend"]
    load_data_script = "./scripts/load_data.py"
    build_image_command = ["docker", "compose", "build"]
    compose_up_command = ["docker", "compose", "up", "-d"]
    
    print(f"[*] Installing python packages")
    subprocess.run(["python3", "-m", "pip", "install", "-r", "./requirements.txt"])
    
    for name in image_names:
        command = copy.deepcopy(build_image_command)
        command.append(name)
        subprocess.run(command)
        print(f"[*] Built {name} docker image")

    print(f"[*] Starting docker containers")
    subprocess.run(compose_up_command)

    print(f"[*] Loading dummy data into MySQL")
    subprocess.run(["python3", load_data_script])



