import { Inngest } from "inngest";
import User from "../models/User.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });



const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // create username from first email
    let username = email_addresses[0].email_address.split("@")[0];

    // check availability of username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userData = {
      _id: id, // make sure your schema uses type: String for _id
      email: email_addresses[0].email_address, // ✅ fixed field
      full_name: `${first_name} ${last_name}`,
      profile_picture: image_url,
      username,
    };

    await User.create(userData);
    console.log("✅ User created:", userData);
  }
);

// Inngest function to update data in database


const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "user.updated" },   // Clerk event name
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const updateUserData = {
        email: email_addresses[0].email_address,
        full_name: `${first_name} ${last_name}`,
        profile_picture: image_url,
      };

      const updated = await User.findOneAndUpdate(
        { _id: id },
        updateUserData,
        { new: true }
      );

      if (!updated) {
        console.log("⚠️ No user found with id:", id);
      } else {
        console.log("✅ User updated:", updated);
      }
    } catch (err) {
      console.error("❌ Error in user update:", err);
    }
  }
);


// Inngest function to delete data from database


const syncUserDeletion = inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'user.deleted'},
    async({event})=>{
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
)




// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];