﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WuHu.Common;
using WuHu.Dal.Common;
using WuHu.Dal.SqlServer;
using WuHu.Domain;

namespace WuHu.BL.Impl
{
    public class MatchManager : IMatchManager
    {
        protected readonly Authenticator Authentication;
        protected readonly IMatchDao MatchDao;
        protected readonly IPlayerDao PlayerDao;
        protected readonly ITournamentDao TournamentDao;
        protected readonly IScoreParameterDao ParamDao;
        protected readonly IRatingDao RatingDao;
        protected readonly IRatingManager RatingManager;
        protected readonly Random Rand = new Random();
        protected bool TournamentLocked;

        public MatchManager()
        {
            var database = DalFactory.CreateDatabase();
            MatchDao = DalFactory.CreateMatchDao(database);
            PlayerDao = DalFactory.CreatePlayerDao(database);
            RatingDao = DalFactory.CreateRatingDao(database);
            TournamentDao = DalFactory.CreateTournamentDao(database);
            ParamDao = DalFactory.CreateScoreParameterDao(database);
            RatingManager = ManagerFactory.GetRatingManager();
            Authentication = Authenticator.GetInstance();
        }

        // Match
        public bool SetScore(Match match, Credentials credentials)
        {
            if (!Authenticate(credentials, true) || match.MatchId == null)
            {
                return false;
            }

            var oldMatch = MatchDao.FindById(match.MatchId.Value);

            if (oldMatch.IsDone)
            {
                return false;
            }

            // copying values over to oldMatch to avoid accidently changing any other values
            oldMatch.ScoreTeam1 = match.ScoreTeam1;
            oldMatch.ScoreTeam2 = match.ScoreTeam2;
            oldMatch.IsDone = true;
            match.IsDone = true;

            var updated = MatchDao.Update(oldMatch);

            if (!updated)
            {
                return false;
            }

            RatingManager.AddCurrentRatingFor(match.Player1, credentials);
            RatingManager.AddCurrentRatingFor(match.Player2, credentials);
            RatingManager.AddCurrentRatingFor(match.Player3, credentials);
            RatingManager.AddCurrentRatingFor(match.Player4, credentials);
            return true;
        }

        public IList<Match> GetAllMatches()
        {
            return MatchDao.FindAll();
        }

        public IList<Match> GetAllMatchesFor(Player player)
        {
            return MatchDao.FindAllByPlayer(player);
        }

        public IList<Match> GetAllMatchesFor(Tournament tournament)
        {
            return MatchDao.FindAllByTournament(tournament);
        }

        public IList<Match> GetAllUnfinishedMatches()
        {
            return new List<Match>(MatchDao.FindAll().Where(m => !m.IsDone));
        }

        private bool Authenticate(Credentials credentials, bool adminRequired)
        {
            return Authentication?.Authenticate(credentials, adminRequired) ?? false;
        }
    }
}
