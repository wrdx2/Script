import java.util.LinkedList;

public class ChatService {
	private static ChatService chat;
	private LinkedList<String> list;
	private ChatService(){}
	
	public static ChatService getChat(){
		if(chat==null){
			chat = new ChatService();
		}
		return chat;
	}
	
	public void addMsg(String Msg,String uname){
		if(list==null){
			list = new LinkedList<String>();
		}
		if(list.size()>10){
			list.removeFirst();
		}
		list.add(uname+"˵:"+Msg);
		
	}
	
	public String getMsg(){
		
		String Msg = "";
		if(list!=null){
			for (String str:list) {
				Msg+=(str+"\n");
			}
		}
		return Msg;
	}
}
