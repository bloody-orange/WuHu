﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Win32;
using WuHu.Domain;

namespace WuHu.Terminal.ViewModels
{
    public class TournamentVm : BaseVm
    {
        private readonly Tournament _tournament;
        private BaseVm _currentVm;
        
        private readonly MatchListVm _matchListVm;
        
        public TournamentVm(Action reloadTabs, Action<string> queueMessage)
        {
            _tournament = TournamentManager.GetMostRecentTournament();

            _matchListVm = new MatchListVm(p => 
                SwitchVm(new NewTournamentVm(
                    () => SwitchVm(_matchListVm),
                    () => _matchListVm.Reload(),
                    queueMessage
                )),
                t => SwitchVm(new EditTournamentVm(
                    t,
                    () => SwitchVm(_matchListVm),
                    () => _matchListVm.Reload(),
                    queueMessage
                )),
                reloadTabs,
                queueMessage
            );
            
            CurrentVm = _matchListVm;
        }

        public BaseVm CurrentVm
        {
            get { return _currentVm; }
            set
            {
                if (!Equals(_currentVm, value))
                {
                    _currentVm = value;
                    OnPropertyChanged(this);
                }
            }
        }

        private void SwitchVm(BaseVm vm)
        {
            CurrentVm = vm;
        }

        public ICommand SetMatchesCommand { get; }
    }
}
