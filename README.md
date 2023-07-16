# Smart Economy App

Smart Economy is a decision support system to determine village potential based on smart economy index, expert opinions, and geographical modelling.

## Deployment

You need to create a `.env` file on backend and frontend file, check the provided example file for reference. Then, update the `services.conf` in the reverse-proxy directory, this is done to instruct nginx to forward the HTTP requests to the appropriate upstream backend. Finally, install docker and run `docker-compose up` to start the web server.
