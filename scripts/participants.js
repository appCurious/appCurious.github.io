import html from "snabby";

const init = (options) => {
    // whatever the module needs track UI state
    return {
        participants: options.participants,
        hasExpandedInterests: false,
        hasExpandedTechnologies: false,
    };
};

/**
 *
 * @param {object} model UI state and render options
 * @param {Function} update snabby update function for shadowDom updates
 * @returns HTML
 */
const view = (model, update) => {
    return html`<div class="participants"
        @key="participants">
        ${viewParticipants(model, update)}
    </div>`;
};

const expandDetail = (model, update, isExpanded) => {
    console.log('model ', model, isExpanded)
    model[isExpanded] = !model[isExpanded];
    console.log('i clicked you ', model)
    update();
};

const viewParticipants = (model, update) => {
    return model.participants.map((participant) => {

        return html`<section class="participant">
            <div class="name">${participant.name}</div>
            <div class="expandable about">${participant.aboutMe}</div>
            <div class="expandable interests" style="height: 20px; width: 100%;"
                @class:expanded=${model.hasExpandedInterests}
                @on:click=${() => expandDetail(model, update, 'hasExpandedInterests')}>

            </div>
        </section>`;
    });
}

export default { init, view };
