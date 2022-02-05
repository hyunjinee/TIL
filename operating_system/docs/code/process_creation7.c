#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

/*
  How many processes are created?
*/
int main() 
{
  fork(); // fork a child process
  fork(); // fork another child process
  fork(); // and fork anoter
  printf("Hello, fork()\n");
  return 0;
}

// ans -> 8