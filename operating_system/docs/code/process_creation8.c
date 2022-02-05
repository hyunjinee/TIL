#include <stdio.h>
#include <unistd.h>

/* 
 * How many processes are created?
*/

int main()

{
  pid_t pid;
  int i;
  for (i = 0 ; i < 4; i ++) {
    pid = fork ();
  }
  printf("Hello, Fork() %d\n", pid);
  return 0;
}

// ans ->2의 4승 16개