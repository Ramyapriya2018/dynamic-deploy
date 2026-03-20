using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string connectionString =
builder.Configuration.GetConnectionString("DefaultConnection");

// 👇 ADD THIS HERE (or at bottom)

app.MapGet("/users", async () =>
{
    var users = new List<object>();

    using SqlConnection conn = new(connectionString);
    await conn.OpenAsync();

    SqlCommand cmd = new("SELECT Id, Name FROM Users", conn);
    var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        users.Add(new
        {
            id = reader.GetInt32(0),
            name = reader.GetString(1)
        });
    }

    return users;
});

app.MapPost("/users", async (HttpContext context) =>
{
    var user = await context.Request.ReadFromJsonAsync<User>();

    using SqlConnection conn = new(connectionString);
    await conn.OpenAsync();

    int id = new Random().Next(1, 1000000);

    var cmd = new SqlCommand("INSERT INTO Users (Id, Name) VALUES (@Id, @Name)", conn);
    cmd.Parameters.AddWithValue("@Id", id);
    cmd.Parameters.AddWithValue("@Name", user.Name);

    await cmd.ExecuteNonQueryAsync();

    return Results.Ok();
});


app.MapPut("/users/{id}", async (int id, User user) =>
{
    using SqlConnection conn = new(connectionString);
    await conn.OpenAsync();

    var cmd = new SqlCommand("UPDATE Users SET Name=@Name WHERE Id=@Id", conn);
    cmd.Parameters.AddWithValue("@Id", id);
    cmd.Parameters.AddWithValue("@Name", user.Name);

    await cmd.ExecuteNonQueryAsync();

    return Results.Ok();
});


app.MapDelete("/users/{id}", async (int id) =>
{
    using SqlConnection conn = new(connectionString);
    await conn.OpenAsync();

    var cmd = new SqlCommand("DELETE FROM Users WHERE Id=@Id", conn);
    cmd.Parameters.AddWithValue("@Id", id);

    await cmd.ExecuteNonQueryAsync();
    return Results.Ok();
});


app.Run();
record User( string Name);
