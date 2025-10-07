# Reference Commands

## SSH to EC2

```bash
ssh -i your-key-pair.pem ec2-user@<PUBLIC-IP-ADDRESS>
```

## Install Docker and Docker Compose on EC2

```bash
sudo yum install -y docker
sudo service docker start
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

docker --version
docker-compose --version
```

## Add ec2 user to the Docker group

```bash
sudo usermod -a -G docker ec2-user
```

## Generate SSH Key

```bash
ssh-keygen -t rsa
```