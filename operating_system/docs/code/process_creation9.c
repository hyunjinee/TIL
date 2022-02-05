#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
  pid_t pid;
  pid = fork();

  if (pid == 0) {
    execlp("/bin/ls", "ls", NULL);
    printf("LINE J\n"); // 실행 안됨
  } 
  else if (pid > 0{
    wait(NULL);
    printf("Child Complete\n");
  })

  return 0;
}