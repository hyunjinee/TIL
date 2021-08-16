public class ThreadTester {
    public static void main(String [] args)
    {
        PrintThread thread1 = new PrintThread("thread1");
        PrintThread thread2 = new PrintThread("thread2");
        PrintThread thread3 = new PrintThread("thread3");

        System.err.println("Starting threads");

        thread1.start();
        thread2.start();
        thread3.start();

        System.err.println("Threads started, main ends\n");



    }
}

class PrintThread extends Thread {
    private int sleepTime;

    public PrintThread(String name) {
        super(name);
        sleepTime = (int) (Math.random() * 5001);
    }

    public void run()
    {
        try {
            System.err.println(getName() + " going to sleep for" + sleepTime + " milliseconds");
            Thread.sleep(sleepTime);
        }
        catch (InterruptedException exception) {
            exception.printStackTrace();
        }

        System.err.println(getName() + " done sleeping");
    }
}