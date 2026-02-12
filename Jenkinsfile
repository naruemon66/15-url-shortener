pipeline {

  environment {
    // แก้เป็นตัวเล็ก และใช้ขีดกลาง (-) แทน Underscore (_)
    VERCEL_PROJECT_NAME = 'devops15-quiz1'
    VERCEL_TOKEN = credentials('devops15-token')
}
   agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: my-builder
    image: node:20-alpine
    command:
    - cat
    tty: true
'''
    }
  }

  stages {
    stage('Test npm') {
      steps {
        container('my-builder') {
          sh 'npm --version'
          sh 'node --version'
        }
      }
    }

    stage('Build') {
      steps {
        container('my-builder') {
          sh 'npm install'
        }
      }
    }

    stage('Test Build') {
      steps {
        container('my-builder') {
          sh 'npm run'
        }
      }
    }

    stage('Deploy') {
      steps {
        container('my-builder') {
          sh 'npm install -g vercel@latest'
          sh '''
            vercel link --project $VERCEL_PROJECT_NAME --token $VERCEL_TOKEN --yes
            vercel --token $VERCEL_TOKEN --prod --confirm
          '''
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished'
    }
  }
}