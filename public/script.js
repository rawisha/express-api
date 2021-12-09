


// ------------------ Update user add info -------------------- //

const updateUserInfo = async () =>
{
    const res = await fetch("http://localhost:5000/api/getposts/")
    alert(res, "hej");
}

document.getElementById("update-user-btn").addEventListener("click", () => 
{
    updateUserInfo();
}
);