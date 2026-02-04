game.Rendered:Connect(function(a0: number)
    local part: Instance = game.Environment["Part"]
    part:Clone()
end)

local p: Player
p.Chatted:Connect(function(a0: string, a1: PlayerChatEvent)
    print(game["Environment"]["Brick"])
    
end)