import html         from  'snabby';
import { toVNode }  from 'snabbdom';
import participants from './participants';

async function main () {
    
    // DOM content target
    let _currentNode = toVNode(document.querySelector('#app'));

    // include data for modules
    let participantsData = await fetch('./data/participants.json');
    participantsData = await participantsData.json();

    // setup ui model for application
    const uiModel = {
        // TODO: read file and send participants as options
        participants: participants.init(participantsData),
    };

    const _update = () => {
        const newNode = html`<div id="app" @key=app>
            <div class="content" @key=content>
                <h1>App Curious Developers</h1>
                ${participants.view(uiModel.participants, _update)}
            </div>
        </div>`
        _currentNode = html.update(_currentNode, newNode);
    };
    // _update(html`<div id="app" @key=app>
    //     <div class="content" @key=content>
    //         <h1>App Curious Developers</h1>
    //         ${participants.view(uiModel.participants, _update)}
    //     </div>
    // </div>`);
    _update();
}

main();

