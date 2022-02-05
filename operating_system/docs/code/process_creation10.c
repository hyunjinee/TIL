#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
  pid_t pid, pid1;
  pid = fork();

  if (pid == 0) {
    pid1 = getpid();
    printf("child: pid = %d A\n", pid); //  A
    printf("child: pid = %d B\n", pid1); // B 
  }
  else if (pid > 0) {
    pid1 = getpid();
    printf("parent: pid = %d C\n", pid); // C child pid
    printf("parent: pid = %d D\n", pid1); // D parent pid
    wait(NULL);
  }

  return 0;
}

// B == C