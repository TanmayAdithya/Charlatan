

export default class ProfilesView {

    constructor (root, { onProfileSelect, onProfileAdd, onProfileEdit, onProfileDelete } = {}) {
        this.root = root
        this.onProfileSelect = onProfileSelect;
        this.onProfileAdd = onProfileAdd;
        this.onProfileEdit = onProfileEdit;
        this.onProfileDelete = onProfileDelete;
        this.root.innerHTML = `
        <div class="character-profiles--sidebar">
            <button class="new-profile" type="button">Add Profile</button>
            <div class="characters-profiles-list"></div>
        </div>
        <div class="profile-preview">
            <input class="profile__title" type="text" placeholder="New Profile">
            <h3>Gender</h3>
            <input class="profile__gender" type="text" placeholder="Enter Gender">
            <h3>Age</h3>
            <input class="profile__age" type="text" placeholder="Enter Age">
            <textarea class="profile__body" placeholder="Description"></textarea>
        </div>
        `;

        const btnAddProfile = this.root.querySelector(".new-profile");
        const inpTitle = this.root.querySelector(".profile__title");
        const inpBody = this.root.querySelector('.profile__body');
        const inpGender = this.root.querySelector('.profile__gender');
        const inpAge = this.root.querySelector('.profile__age');

        btnAddProfile.addEventListener("click", () => {
            this.onProfileAdd();
        });

        [inpTitle, inpBody,inpGender,inpAge].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                const updatedGender = inpGender.value.trim();
                const updatedAge = inpAge.value.trim();

                this.onProfileEdit(updatedTitle, updatedBody, updatedGender,updatedAge);
            });
        });

        this.updateProfilePreviewVisibility(false);
             
    }

    _createListItemHTML(id,title,body,updated) {

        const MAX_BODY_LENGTH = 75;

        return `
            <div class="character-profiles-list-item" data-profile-id="${id}">
                
                <div class="profile__small-title">${title}</div>
                <div class="profile__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="profile__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        
        `;
    }

    updatedProfileList(profiles) {
        const profilesListContainer = this.root.querySelector(".characters-profiles-list");

        //Empty List
        profilesListContainer.innerHTML = "";

        for ( const profile of profiles) {
            const html = this._createListItemHTML(profile.id, profile.title, profile.body, new Date(profile.updated));
        
            profilesListContainer.insertAdjacentHTML("beforeend", html);    

        }

        //Add select/delete events for each list item
        profilesListContainer.querySelectorAll(".character-profiles-list-item").forEach(profileListItem => {
            profileListItem.addEventListener('click', () => {
                this.onProfileSelect(profileListItem.dataset.profileId);
            });

            profileListItem.addEventListener("dblclick", () => {

                const doDelete = confirm("Are you sure you want to delete this profile?");

                if (doDelete) {

                    this.onProfileDelete(profileListItem.dataset.profileId)
                }

            });

        });
        
    }

    updateActiveProfile(profile) {
        this.root.querySelector(".profile__title").value = profile.title;
        this.root.querySelector(".profile__body").value = profile.body;
        this.root.querySelector(".profile__gender").value = profile.gender;
        this.root.querySelector(".profile__age").value = profile.age;

        this.root.querySelectorAll(".character-profiles-list-item").forEach(profileListItem  => {
            profileListItem.classList.remove("character-profiles-list-item--selected");
        });

        this.root.querySelector(`.character-profiles-list-item[data-profile-id="${profile.id}"]`).classList.add("character-profiles-list-item--selected");



    }

    updateProfilePreviewVisibility(visibile) {
        this.root.querySelector(".profile-preview").style.visibility = visibile ? "visible" : "hidden"
    }



}