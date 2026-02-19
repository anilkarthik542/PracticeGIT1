pipeline {
  agent any
  environment { CI = 'true' }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }
    stage('Install Playwright deps') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright install --with-deps'
          } else {
            bat 'npx playwright install'
          }
        }
      }
    }
    stage('Run tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright test tests/poms/test_runner/test_login.spec.js --reporter=html,junit'
          } else {
            bat 'npx playwright test tests/poms/test_runner/test_login.spec.js --reporter=html,junit'
          }
        }
      }
    }
    stage('Archive reports') {
      steps {
        archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
    }
  }
}
