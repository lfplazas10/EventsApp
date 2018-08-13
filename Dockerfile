FROM ubuntu:latest
USER root
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install -y openjdk-8-jdk --fix-missing
RUN apt-get install -y unzip
# RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823
# RUN apt-get update
# RUN apt-get install -y sbt
ADD ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
ADD ./target/universal/server-manager-1.0-SNAPSHOT.zip /etc
WORKDIR /etc
RUN unzip server-manager-1.0-SNAPSHOT.zip 
RUN chmod +x /etc/server-manager-1.0-SNAPSHOT
# RUN /etc/server-manager-1.0-SNAPSHOT/bin/server-manager -Dplay.http.secret.key=abcdefghijk


