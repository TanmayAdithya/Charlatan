
import ProfilesView from "./ProfilesView.js";
import profileAPI from "./profileAPI.js";

export default class App {

    constructor(root) {
        this.profiles = [];
        this.activeProfile= null;
        this.view = new ProfilesView(root, this._handlers());
        
        this._refreshProfiles();
    }

    _refreshProfiles() {
        const profiles = profileAPI.getAllProfiles();

        this._setProfiles(profiles);

        if (profiles.length > 0) {
            this._setActiveProfile(profiles[0]);
        }
    }

    _setProfiles(profiles) {
        this.profiles = profiles;
        this.view.updatedProfileList(profiles);
        this.view.updateProfilePreviewVisibility(profiles.length > 0);
    }

    _setActiveProfile(profile) {
        this.activeProfile = profile;
        this.view.updateActiveProfile(profile)
    }

    _handlers() {
        return {
            onProfileSelect: profileId => {
                const selectedProfile = this.profiles.find(profile => profile.id == profileId);
                this._setActiveProfile(selectedProfile);
            },

            onProfileAdd: () => {
                const newProfile = {
                    title: "New Profile",
                    body: "Description...",
                    gender: "Gender",
                    age:"Age"
                    
                    
                };

                profileAPI.saveProfile(newProfile);
                this._refreshProfiles();
            
            },

            onProfileEdit: (title,body,gender,age) => {
                profileAPI.saveProfile({
                    id: this.activeProfile.id,
                    title,
                    body,
                    gender,
                    age
                });

                this._refreshProfiles();
            },

            onProfileDelete: profileId => {
                profileAPI.deleteProfile(profileId);
                this._refreshProfiles();
            },
        };
    }

}