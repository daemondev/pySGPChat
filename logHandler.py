import string, logging, logging.handlers

MAILHOST = 'smtp.mdycontactcenter.com'
FROM     = 'richar.samaniego@mdycontactcenter.com'
#TO       = ['richar.samaniego@mdycontactcenter.com', 'romel.escobedo@mdycontactcenter.com']
TO       = ['richar.samaniego@mdycontactcenter.com']
SUBJECT  = 'pySGPChat Email Broker-Service'

class BufferingSMTPHandler(logging.handlers.BufferingHandler):
    def __init__(self, mailhost=MAILHOST, fromaddr=FROM, toaddrs=TO, subject=SUBJECT, capacity=10):
        logging.handlers.BufferingHandler.__init__(self, capacity)
        self.mailhost = mailhost
        self.mailport = None
        self.fromaddr = fromaddr
        self.toaddrs = toaddrs
        self.subject = subject
        self.setFormatter(logging.Formatter("%(asctime)s %(levelname)-5s %(message)s"))

    def flush(self):
        if len(self.buffer) > 0:
            try:
                import smtplib
                port = self.mailport
                if not port:
                    port = smtplib.SMTP_PORT
                smtp = smtplib.SMTP(self.mailhost, port)
                msg = "From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n" % (self.fromaddr, ",".join(self.toaddrs), self.subject)
                for record in self.buffer:
                    s = self.format(record)
                    print(s)
                    msg = msg + s + "\r\n"
                smtp.sendmail(self.fromaddr, self.toaddrs, msg)
                smtp.quit()
            except:
                self.handleError(None)
            self.buffer = []

def test():
    logger = logging.getLogger("")
    logger.setLevel(logging.DEBUG)
    logger.addHandler(BufferingSMTPHandler(MAILHOST, FROM, TO, SUBJECT, 10))
    for i in range(2):
        logger.info("Info index = %d", i)
    logging.shutdown()

if __name__ == "__main__":
    test()
