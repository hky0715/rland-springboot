package kr.co.rland.web.socket.config;

import java.util.List;
import java.util.ArrayList;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

import kr.co.rland.web.socket.config.WebSocketUser;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    List<WebSocketUser> users = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        WebSocketUser user = new WebSocketUser();
        
        System.out.println("connected from " + session.getRemoteAddress());

        session.sendMessage(new TextMessage("Hello!"));
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String msg = message.getPayload();
        WebSocketData data = new Gson().fromJson(msg, WebSocketData.class);
        
        // 내가 메시지를 보내고자 하는 사용자들의 목록을 가지고 있어야 함.. client의 name + session
        for(WebSocketSession s : users)
            s.sendMessage(new TextMessage(message.getPayload()));

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        users.remove(session);
        System.out.println("Closed from "+session.getRemoteAddress());
    }

}
