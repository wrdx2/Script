import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class ChatServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		String chatMsg = request.getParameter("chatMsg");
		ChatService chatService = ChatService.getChat();
		
		if(null!=chatMsg && chatMsg.trim().length()>0){
			chatService.addMsg(chatMsg, request.getRemoteAddr());
			String getMsg = chatService.getMsg();
			out.print(getMsg);
		}else{
			String getMsg = chatService.getMsg();
			out.print(getMsg);
		}
	}
}
