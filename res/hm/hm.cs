using System;
using System.Security.Cryptography;
using System.IO;

namespace FileHashSample
{
    public class FileHash
    {
        public FileHash()
        {
            return;
        }

        public string ComputeHash(string filePath)
        {
            string filePathNormalized = System.IO.Path.GetFullPath(filePath);
            SHA1 sha = new SHA1Managed();
            FileStream fs = new FileStream(filePathNormalized, FileMode.Open, FileAccess.Read);
            byte[] byteHash = sha.ComputeHash(fs);
            fs.Close();
            return Convert.ToBase64String(byteHash, 0, byteHash.Length);
        }

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Please Enter a File Path");
                return;
            }
            string filePath = System.IO.Path.GetFullPath(args[0]);
            FileHash objFileHash = new FileHash();
            Console.WriteLine("File Path is {0}", filePath);
            Console.WriteLine("File Hash is {0}", objFileHash.ComputeHash(filePath));
            return;
        }
    }

}
