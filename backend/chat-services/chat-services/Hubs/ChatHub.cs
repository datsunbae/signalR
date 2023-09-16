using chat_services.Request;
using Microsoft.AspNetCore.SignalR;

namespace chat_services.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserConnetionRequest> _connection;
        private readonly string _botUser;

        public ChatHub(IDictionary<string, UserConnetionRequest> connection)
        {
            _connection = connection;
            _botUser = "BotChat";
        }

        public async Task JoinRoom(UserConnetionRequest request)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, request.Room);
            _connection[Context.ConnectionId] = request;
            await Clients.Group(request.Room).SendAsync("ReceiveMessage", _botUser, $"{request.UserName} has joined {request.Room}");
            await SendUsersInRoom(request.Room);
        }

        public async Task SendMessage(string message)
        {
            if(_connection.TryGetValue(Context.ConnectionId, out UserConnetionRequest userConnetion)) 
            {
                await Clients.Group(userConnetion.Room).SendAsync("ReceiveMessage", userConnetion.UserName, message);
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connection.TryGetValue(Context.ConnectionId, out UserConnetionRequest userConnetion))
            {
                _connection.Remove(Context.ConnectionId);
                Clients.Group(userConnetion.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnetion.UserName} has left");
                SendUsersInRoom(userConnetion.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendUsersInRoom(string room)
        {
            var users = _connection.Values.Where(u => u.Room == room).Select(u => u.UserName);
            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
