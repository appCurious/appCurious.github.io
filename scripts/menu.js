import html from snabby

const init = (options) => {
  return {
    participants: options.participants,
    itemOpen: 'participants',
  };
};

const view = (model) => {
  const items = [
    // what pages should we have for navigation?
    // participants
    // gallery of projects
    html`<item >participants</item>`,

  ];
  return html`<div>
    <ul> ${items} </ul>
  </div>`;
};

 export default { init, view };
