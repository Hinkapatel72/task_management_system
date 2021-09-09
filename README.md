## TaskManagementSystem
Task Management System allows for easy tracking of task and responsibilities across organization.

## Develpement Guide
### Setting up Database
The backend service is a flask based service. Follow the steps to set the environment to run the flask app.
Step 1: Clone the repo and move to staff dir. Following steps assume that your current working dir is `<YourProjectPath>/Tms/src/backend`
```
git clone <>
cd Tms/src/backend
```
Step 2: Install mySQL server and create username and password.
Step 4: Set mysql url in environment
```
export DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost/<DATABASE_NAME>
```
Step 3: Install python dependencies.
```
pip3 install -r requirements.txt --user
```
Step 4: Run Migrations
```
export FLASK_APP=models.py
flask db init <--- RUN ONLY IF migrations/ folder is missing. If running it first time.
flask db migrate
flask db upgrade head
```
Notes
- If flask command line is missing, make sure that your $PATH env variable has path where flask was installed.

### Setting up Webservice
To run the URLs please run "app.py" file.
Open this URL "http://127.0.0.1:5000/" to see "Hello World!"
