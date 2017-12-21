import sys

def decrypt(k,cipher):
    plaintext = ''

    flag = 0
    salt = 15

    for each in cipher:
        if flag == 0:
            p = (ord(each)-salt) % 126
            flag = 1
        else:
            p = (ord(each)+salt) % 126
            flag = 0

        if p < 32:
            p += 95
        plaintext += chr(p)
    print plaintext

def main(argv):
    if (len(sys.argv) != 1):
        sys.exit('Usage: cracking.py')

    cipher = raw_input('Enter message: ')
    #for i in range(1,95,1):
    decrypt(1,cipher)

if __name__ == "__main__":
   main(sys.argv[1:])
   #main(raw_input('Enter message: '))
