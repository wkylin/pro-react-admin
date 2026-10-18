# Build the selected project once in CI, then package those exact artifacts.
FROM nginxinc/nginx-unprivileged:1.29-alpine
ARG ARTIFACT_DIR=dist-enterprise
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY ${ARTIFACT_DIR}/ /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
