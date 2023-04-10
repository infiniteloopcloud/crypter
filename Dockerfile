FROM scratch

COPY ./build_artifact /crypter
COPY ./ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
ENTRYPOINT [ "/crypter" ]
