public class Producer extends Thread
{
    private Buffer sharedLocation;

    public Producer(Buffer shared) 
    {
        super("Producer");
        sharedLocation = shared;
    
    }

    public void run()

    {
        for (int count = 1 ; count <= 4; count++) 
        {
            try 
            {
                Thread.sleep((int) (Math.random() * 3001));
                sharedLocation.set(count);
            }
            catch (InterruptedException exception) 
            {
                exception.printStackTrace();
            }
        }

        
    }
}