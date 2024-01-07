/*
cd /mnt/chromeos/MyFiles/code/personal/c;
g++ -Wall -s -O3 qDL.cpp -o qDL; wc -c qDL
clear; g++ qDL.cpp -S -o qDL.asm
g++ -x assembler qDL.asm -o qDL
*/

#include <stdio.h>
#include <iostream>
  
//#include "json.hpp"
//#include "util.h"
//using json = nlohmann::json;
#include <math.h>
#include <cstring>
#include <sys/time.h>
int randInt(int lower, int upper){
  struct timeval seed;
  gettimeofday(&seed, NULL);
  srand(seed.tv_usec+::rand()+(int)::time(0));
  return (::rand() % (upper - lower + 1)) + lower;
}
int intDigs(int n){ 
  int i, count; 
  for (i = 10, count = 0; ; i *= 10, count++) { 
    if (n / i == 0) { 
      break; 
    } 
  } 
  return count + 1; 
}
char* int2str(int number){ 
  int prev = 0, i, j, digs = intDigs(number); 
  char *numStr = (char *)malloc(sizeof(char) * (digs + 1)); //+1 for null
  for (i = 0, j = pow(10, digs - 1); i < digs; i++, j /= 10) { 
    numStr[i] = (number / j - (prev * 10)) + 48;  // int to ascii
    prev = number / j; 
  } 
  numStr[i] = '\0'; 
  return numStr;
}
char* shuffle(char* str){
  for (int i = strlen(str)-1; i > 0; i--){
    char tempStrI = str[i];
    int ran = randInt(0,i);
    str[i] = str[ran];
    str[ran] = tempStrI;
  }
  return str;
}
int main(){
  //::mkdir("/uBin", 775);
  //::mkdir("/uBin/path",775);
  //::mkdir("/uBin/exec", 775);
  //FILE *fp = ::fopen(strcat(getenv("HOME"),"/.bashrc"), "a");
  //fputs("#vl\nexport PATH=\"$PATH\":/uBin/path", fp);
  //::fclose(fp);
  printf("%s\n", shuffle((char*)"123456789"/*int2str(123456789)*/));
  return 1028819;
}



























