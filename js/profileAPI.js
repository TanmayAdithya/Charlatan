

export default class profileAPI {
    
    static getAllProfiles() {

        const profiles = JSON.parse(localStorage.getItem("charlatan-profiles") || "[]");
    
        return profiles.sort((a,b) => {
            
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;

                
            })

    }

    static saveProfile(profileToSave) {

        const profiles = profileAPI.getAllProfiles();
        const existing = profiles.find(profile => profile.id == profileToSave.id);

        // Edit/Update
        
        if (existing) {

            existing.title = profileToSave.title
            existing.body = profileToSave.body
            existing.gender = profileToSave.gender
            existing.age = profileToSave.age
            existing.updated = new Date().toISOString();


        } else {
            
            profileToSave.id = Math.floor(Math.random() * 1000000);
            profileToSave.updated = new Date().toISOString();
            profiles.push(profileToSave);
        
        }   


        

        localStorage.setItem("charlatan-profiles", JSON.stringify(profiles));

    }

    static deleteProfile(id) {

        const profiles = profileAPI.getAllProfiles();
        const newProfiles = profiles.filter(profile => profile.id != id);
        localStorage.setItem("charlatan-profiles", JSON.stringify(newProfiles));

    }
}