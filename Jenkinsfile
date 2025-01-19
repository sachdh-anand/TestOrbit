pipeline {
    agent any

    // Environment variables
    environment {
        DOCKER_IMAGE = "your-docker-repo/your-app:${env.BUILD_TAG}" // Docker image tag
        SLACK_WEBHOOK = credentials('slack-webhook') // Slack Webhook for notifications
        GITHUB_CREDENTIALS = credentials('github-access-token') // GitHub token for authentication
        QA_ENV_URL = "http://qa-environment-url.com" // QA environment URL
        DEV_ENV_URL = "http://dev-environment-url.com" // Dev environment URL
        RELEASE_TAG = "" // To hold the release tag dynamically
    }

    triggers {
        // Nightly pipeline trigger at 1 AM
        cron('H 1 * * *')
        // GitHub webhook trigger for PR merges and release tags
        githubPush()
    }

    stages {
        // ----------------- PRE-MERGE STATIC CODE ANALYSIS -----------------
        stage('Pre-Merge Static Code Analysis') {
            when {
                expression { env.BRANCH_NAME != 'main' }
            }
            steps {
                script {
                    echo "Running static code analysis for branch ${env.BRANCH_NAME}"
                }
                sh """
                npm install
                npx eslint .
                npx npm audit
                """
            }
            post {
                failure {
                    error "Static code analysis failed! Merge to main branch is blocked."
                }
            }
        }

        // ----------------- DEV PIPELINE -----------------
        stage('Dev Pipeline - PR Merge to Main') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            stages {
                stage('Checkout Code') {
                    steps {
                        // Checkout the latest code from the main branch
                        withCredentials([usernamePassword(credentialsId: 'github-access-token', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN')]) {
                            sh """
                            git config --global credential.helper store
                            git clone https://${USERNAME}:${TOKEN}@github.com/your-repo-name.git
                            cd your-repo-name
                            git checkout main
                            """
                        }
                    }
                }

                stage('Build Docker Image for Dev') {
                    steps {
                        // Build the Docker image for the Dev environment
                        sh 'docker build -t ${DOCKER_IMAGE} .'
                    }
                }

                stage('Push Docker Image') {
                    steps {
                        // Push the Docker image to a container registry
                        script {
                            docker.withRegistry('https://your-docker-registry', 'docker-credentials') {
                                docker.image("${DOCKER_IMAGE}").push()
                            }
                        }
                        echo "Docker image pushed to registry: ${DOCKER_IMAGE}"
                    }
                }

                stage('Notify Kubernetes (Dev)') {
                    steps {
                        // Notify the Kubernetes team or process to pull the new Docker image
                        echo "Notifying Kubernetes to deploy the new Docker image for Dev environment."
                        sh """
                        curl -X POST -H 'Content-type: application/json' \
                        --data '{"text": "New Docker image ${DOCKER_IMAGE} is available for deployment to Dev environment."}' \
                        ${SLACK_WEBHOOK}
                        """
                    }
                }
            }
        }

        // ----------------- DETECT RELEASE TAG -----------------
        stage('Detect Release Tag') {
            steps {
                script {
                    // Fetch the latest release tag
                    env.RELEASE_TAG = sh(
                        script: "git describe --tags `git rev-list --tags --max-count=1`",
                        returnStdout: true
                    ).trim()
                    echo "Release Tag Detected: ${env.RELEASE_TAG}"
                }
            }
        }

        // ----------------- QA PIPELINE -----------------
        stage('QA Pipeline - Trigger on Release Tag') {
            when {
                expression { env.RELEASE_TAG != '' }
            }
            stages {
                stage('Build Docker Image for QA') {
                    steps {
                        // Build the Docker image for QA
                        sh 'docker build -t ${DOCKER_IMAGE} .'
                    }
                }

                stage('Push Docker Image') {
                    steps {
                        // Push the Docker image to a container registry
                        script {
                            docker.withRegistry('https://your-docker-registry', 'docker-credentials') {
                                docker.image("${DOCKER_IMAGE}").push()
                            }
                        }
                        echo "Docker image pushed to registry: ${DOCKER_IMAGE}"
                    }
                }

                stage('Notify Kubernetes (QA)') {
                    steps {
                        // Notify the Kubernetes team or process to pull the new Docker image
                        echo "Notifying Kubernetes to deploy the new Docker image for QA environment."
                        sh """
                        curl -X POST -H 'Content-type: application/json' \
                        --data '{"text": "New Docker image ${DOCKER_IMAGE} is available for deployment to QA environment."}' \
                        ${SLACK_WEBHOOK}
                        """
                    }
                }
            }
        }

        // ----------------- NIGHTLY QA PIPELINE -----------------
        stage('Nightly QA Tests') {
            when {
                triggeredBy 'TimerTrigger'
            }
            steps {
                // Run nightly Cypress tests on the QA environment
                echo "Running nightly Cypress tests on QA environment"
                sh """
                docker run -e BASE_URL=${QA_ENV_URL} ${DOCKER_IMAGE} npx cypress run
                """
            }
        }
    }

    post {
        always {
            // Clean up workspace after pipeline execution
            cleanWs()
            echo "Pipeline execution completed. Check Jenkins UI for details."
        }
    }
}