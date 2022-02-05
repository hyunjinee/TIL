#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

int main()
{
	pid_t pid;
	printf("Before fork() call\n");
	pid = fork();
	if (pid == 0) 
		printf("This is Child process. PID is %d\n", pid);
	else if (pid>0)
		pirntf("This is Parent process. PID is %d\n", pid);
	else
		printf("fork() is failed.\n");
	return 0;
}