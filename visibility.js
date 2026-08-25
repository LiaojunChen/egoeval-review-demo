(function () {
  const HIDDEN_EPISODES = new Set([
    'episode_001441',
    'episode_007646',
    'episode_012274',
    'episode_013626',
    'episode_021758',
    'episode_031820',
    'episode_043071',
    'episode_044118',
  ]);

  let showHidden = false;
  const originalFilteredEpisodes = filteredEpisodes;
  const originalRenderMain = renderMain;

  function visibleEpisodes() {
    const rows = originalFilteredEpisodes();
    return showHidden ? rows : rows.filter((episode) => !HIDDEN_EPISODES.has(episode.episode_id));
  }

  function moveToVisible(direction) {
    const rows = visibleEpisodes();
    if (!rows.length) return;
    const currentEpisode = current();
    let position = rows.indexOf(currentEpisode);
    if (position < 0) position = direction > 0 ? -1 : 0;
    state.index = PAYLOAD.episodes.indexOf(rows[(position + direction + rows.length) % rows.length]);
    state.metric = null;
    render();
  }

  filteredEpisodes = visibleEpisodes;
  renderMain = function () {
    originalRenderMain();
    const previous = document.getElementById('prev');
    const next = document.getElementById('next');
    if (previous) previous.onclick = () => moveToVisible(-1);
    if (next) next.onclick = () => moveToVisible(1);
  };

  const actions = document.querySelector('.top-actions');
  if (!actions) return;
  const control = document.createElement('label');
  control.className = 'visibility-control';
  control.innerHTML = '<input id="showHiddenEpisodes" type="checkbox"><span>显示隐藏样本（8）</span>';
  actions.appendChild(control);

  const checkbox = control.querySelector('input');
  checkbox.addEventListener('change', () => {
    showHidden = checkbox.checked;
    const rows = visibleEpisodes();
    if (!rows.includes(current())) {
      state.index = PAYLOAD.episodes.indexOf(rows[0] || PAYLOAD.episodes[0]);
      state.metric = null;
    }
    render();
  });

  const style = document.createElement('style');
  style.textContent = '.visibility-control{display:inline-flex;align-items:center;gap:7px;color:#aebdca;font-size:12px;white-space:nowrap}.visibility-control input{accent-color:#62b0ff;width:15px;height:15px;margin:0}.visibility-control span{user-select:none}';
  document.head.appendChild(style);

  render();
})();
