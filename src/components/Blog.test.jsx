import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";




test("renders title", () => {
    const user = {
        name: "Test user",
        username: "Test username",
    };
    const blog = {
        title: "Test title",
        authur: "Test authur",
        url: "Test url",
        likes: 0,
        user: {
            name: "Test user",
            username: "Test username",
        },
    };

    render(<Blog blog={blog} user={user}/>);
    const title = screen.getByText(blog.title);
    expect(title).toBeDefined();
});

test("renders url, likes and user when view button is pressed", () => {
    const user = {
        name: "Test user",
        username: "Test username",
    };
    const blog = {
        title: "Test title",
        authur: "Test authur",
        url: "Test url",
        likes: 0,
        user: {
            name: "Test user",
            username: "Test username",
        },
    };

    render(<Blog blog={blog} user={user}/>);
    const button = screen.getByText("view");
    fireEvent.click(button);

    const url = screen.getByText(blog.url);
    const likes = screen.getByText(/likes\s0/i);
    const username = screen.getByText(blog.user.name);

    expect(url).toHaveTextContent(blog.url);
    expect(likes.textContent).toMatch(/^likes 0/);
    expect(username).toHaveTextContent(blog.user.name);
});

test("like button is pressed twice and addLike function is called twice", async () => {
   
    const user = {
        name: "Test user",
        username: "Test username",
    };
    const blog = {
        title: "Test title",
        authur: "Test authur",
        url: "Test url",
        likes: 0,
        user: {
            name: "Test user",
            username: "Test username",
        },
    };

    const mockHandler = vi.fn();
    render(<Blog blog={blog} user={user} addLike={mockHandler} />);
    const user1 = userEvent.setup();
    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);
    screen.debug(viewButton);
    const likeButton = screen.getByText('like');
    await user1.click(likeButton);
    screen.debug(likeButton);
    console.log(mockHandler.mock.calls);
    await user1.click(likeButton);

    // Check if the mockHandler was called twice
    expect(mockHandler.mock.calls.length).toHaveLength(2);

});