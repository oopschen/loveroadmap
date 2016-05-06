# What is is?
This is a roadmap showing how Miss Xu and Mr Chen meet and fall in love.

# Build 
docker run --rm it -v $(pwd):/mnt/gulp-work oopschen/gulp-cmd npm install && gulp prod

# Dev
docker run --rm -it -v $(pwd):/mnt/webpack-work -p 8081:8080 oopschen/webpack-dev-server-cli webpack-dev-server --watch --hot --host=0.0.0.0 --content-base src/
