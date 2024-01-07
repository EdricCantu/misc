#include <time.h>
#include <sys/time.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <stdio.h>
#include <cstring>
#include <string.h>
#include <limits.h>
#include <math.h>
class File{
  public:
    void mkdir(const char *dir) {
      char tmp[PATH_MAX];
      char *p = NULL;
      size_t len;
      snprintf(tmp, sizeof(tmp),"%s",dir);
      len = strlen(tmp);
      if (tmp[len - 1] == '/')
        tmp[len - 1] = 0;
      for (p = tmp + 1; *p; p++)
        if (*p == '/') {
          *p = 0;
          ::mkdir(tmp, 775);
          *p = '/';
        }
      ::mkdir(tmp, 775);
    }
};
class Int{
  public:
    int digits(int n){ 
      int i, count; 
      for (i = 10, count = 0; ; i *= 10, count++) { 
        if (n / i == 0) { 
          break; 
        } 
      } 
      return count + 1; 
    }
    int random(int lower, int upper){
      struct timeval seed;
      gettimeofday(&seed, NULL);
      srand(seed.tv_usec+::rand()+(int)::time(0));
      return (::rand() % (upper - lower + 1)) + lower;
    }
    int sum(int numArray[], int arrLen){
      int i, sum = 0;
      for(i = 0; i < arrLen; i++)
        sum = sum + numArray[i]; // same as sum += arr[i];
      return sum;
    }
};
Int tint;
class Array{
  public:
//    int length(void* arr){
  //    return sizeof(arr)/ sizeof(arr[0]);
    //}
    char* shuffle(char* str){
      for (int i = strlen(str)-1; i > 0; i--){
        char tempStrI = str[i];
        int ran = tint.random(0,i);
        str[i] = str[ran];
        str[ran] = tempStrI;
        
      }
      return str;
    }
};
Array tarr;
class String{
  public:
    const char* baseList[63] = {"","0","01","012","0123","01234","012345","0123456","01234567","012345678","0123456789","0123456789a","0123456789ab","0123456789abc","0123456789abcd","0123456789abcde","0123456789abcdef","0123456789abcdefg","0123456789abcdefgh","0123456789abcdefghi","0123456789abcdefghij","0123456789abcdefghijk","0123456789abcdefghijkl","0123456789abcdefghijklm","0123456789abcdefghijklmn","0123456789abcdefghijklmno","0123456789abcdefghijklmnop","0123456789abcdefghijklmnopq","0123456789abcdefghijklmnopqr","0123456789abcdefghijklmnopqrs","0123456789abcdefghijklmnopqrst","0123456789abcdefghijklmnopqrstu","0123456789abcdefghijklmnopqrstuv","0123456789abcdefghijklmnopqrstuvw","0123456789abcdefghijklmnopqrstuvwx","0123456789abcdefghijklmnopqrstuvwxy","0123456789abcdefghijklmnopqrstuvwxyz","0123456789abcdefghijklmnopqrstuvwxyzA","0123456789abcdefghijklmnopqrstuvwxyzAB","0123456789abcdefghijklmnopqrstuvwxyzABC","0123456789abcdefghijklmnopqrstuvwxyzABCD","0123456789abcdefghijklmnopqrstuvwxyzABCDE","0123456789abcdefghijklmnopqrstuvwxyzABCDEF","0123456789abcdefghijklmnopqrstuvwxyzABCDEFG","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGH","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHI","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJ","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJK","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLM","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQ","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRS","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}
;
    char* baseSwitch(char* fromBase, char* input, char* toBase){
      //char* message = (char*)malloc(512);strcpy(message, fromBase);strcat(message, toBase);return message;
      if(!allCharsWithin(fromBase, input) || hasDuplicateChar(fromBase) || hasDuplicateChar(toBase)){
        return (char*)"";
      }
      return baseSwitch(fromBase, input, toBase, {});
    }
    char* baseSwitch(int fromBase, char* input, int toBase){
      return baseSwitch((char*)(baseList[fromBase]),input,(char*)(baseList[toBase]));
    }
    int allCharsWithin(char* checkIn, char* checkFor){
      for (long unsigned int i = 2; i < sizeof(checkFor); i++) {
        if(!(indexOfChar(checkIn, checkFor[i]) +1)){
          return 0;
        }
      }
      return 1;
    }
    unsigned long long int indexOfChar(char* checkIn, char checkFor){  //.includes is just +1 
      char * found = strchr( checkIn, checkFor );
      if (found != NULL){
        return found - checkIn;
      }else{
        return -1;
      }
    }
    int indexOfBit(char* checkIn, char* checkFor){  //.includes is just +1 
      char * found = strstr( checkIn, checkFor );
      if (found != NULL){
        return found - checkIn;
      }else{
        return -1;
      }
    }
    int hasDuplicateChar(char* ref){
      int count = sizeof(ref);
      for (int i = 0; i < count - 1; i++) {
        for (int j = i + 1; j < count; j++) {
          if (ref[i] == ref[j]) {
            return 1;
          }
        }
      }
      return 0;
    }
    char* from(int number){ 
      int prev = 0, i, j, digs = tint.digits(number); 
      char *numStr = (char *)malloc(sizeof(char) * (digs + 1)); //+1 for null
      for (i = 0, j = pow(10, digs - 1); i < digs; i++, j /= 10) { 
        numStr[i] = (number / j - (prev * 10)) + 48;  // int to ascii
        prev = number / j; 
      } 
      numStr[i] = '\0'; 
      return numStr;
    }
    char *random(size_t length) {
      static char charset[] = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";        
      char *randomString = NULL;
      if (length) {
        randomString = (char*)malloc(sizeof(char) * (length +1));
        if (randomString) {            
          for (long unsigned int n = 0;n < length;n++) {
            randomString[n] = charset[tint.random(0, strlen(charset) - 1)];
          }
          randomString[length] = '\0';
        }
      }
      return randomString;
    }
    char* random(size_t length, char charset[]) {
      char *randomString = NULL;
      if (length) {
        randomString = (char*)malloc(sizeof(char) * (length +1));
        if (randomString) {            
          for (long unsigned int n = 0;n < length;n++) {
            randomString[n] = charset[tint.random(0, strlen(charset) - 1)];
          }
          randomString[length] = '\0';
        }
      }
      return randomString;
    }
    char* reverse(char *str){
      char *p1, *p2;
      if (! str || ! *str)
        return str;
      for (p1 = str, p2 = str + strlen(str) - 1; p2 > p1; ++p1, --p2){
        *p1 ^= *p2;
        *p2 ^= *p1;
        *p1 ^= *p2;
      }
      return str;
    }
    char* baseSwitch(char* fromBase, char* input, char* toBase, unsigned long long int output[]){
      char* rev = reverse(input);
      unsigned long long int fromBaseLength = strlen(fromBase);
      for (unsigned long long int charIndex = 0; charIndex < (unsigned long long int)strlen(input); charIndex++){
        output[charIndex] =
          indexOfChar(fromBase, rev[charIndex]) * 
          pow(fromBaseLength, charIndex);
      }
      return (char*)"lel";
    }
};
String tstr;
/*
var x = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var y = x.length + 1;
var z = [];
while(y--){
  z.push(x.slice(0,y));
};
x = "{";
z.reverse().forEach((item)=>{
  x += JSON.stringify(item)+",";
});
x = x.slice(0, -1) + "}";
console.log("const char* baseList["+z.length+"] = "+x);





String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
*/
