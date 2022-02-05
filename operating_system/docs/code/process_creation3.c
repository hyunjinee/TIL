#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
int main() {
	printf("execute ls\n");
	execl("/bin/ls", "ls", "-l", NULL); // ls -l 실행
	perror("execl is failed\n"); // 에러 출력 (execl로 실행 공간을 덮어 씌웠기 때문에 출력되지 않는다.)
	exit(1);
}