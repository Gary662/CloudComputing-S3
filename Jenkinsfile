pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''    
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    npm test
                '''
            }
        }

        stage('AWS') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args ' --entrypoint=""'
                }
            }
            environment {
                AWS_S3_BUCKET = 'myjenkinsapp-20250325'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'my-Cloud-Computing-S3', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                        aws --version
                        aws s3 ls
                        echo "Hello S3!" > index.html
                        # aws s3 cp index.html s3://$AWS_S3_BUCKET/index.html
                        aws s3 sync build s3://$AWS_S3_BUCKET
                     '''
                }
            }
        }
    }
}
