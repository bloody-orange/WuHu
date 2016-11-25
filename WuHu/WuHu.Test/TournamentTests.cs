﻿using System;
using System.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WuHu.Dal.Common;
using WuHu.Domain;

namespace WuHu.Test
{
    [TestClass]
    public class TournamentTests
    {

        private static string connectionString;
        private static IDatabase database;
        private static IPlayerDao playerDao;
        private static ITournamentDao tournamentDao;
        private static Player testPlayer;

        [ClassInitialize]
        public static void ClassInitialize(TestContext testContext)
        {
            CommonData.BackupDb();

            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnectionString"].ConnectionString;
            database = DalFactory.CreateDatabase();
            playerDao = DalFactory.CreatePlayerDao(database);
            tournamentDao = DalFactory.CreateTournamentDao(database);

            testPlayer = playerDao.FindById(0);
            if (testPlayer == null)
            {
                testPlayer = new Player("first", "last", "nick", "us7er", "pass",
                    false, false, false, false, false, true, true, true, null);
                playerDao.Insert(testPlayer);
            }
        }

        [TestMethod]
        public void Constructor()
        {
            string name = "name";
            Assert.IsNotNull(tournamentDao);

            Tournament tournament = new Tournament(0, name, testPlayer);
            Assert.IsNotNull(tournament);

            tournament = new Tournament(name, testPlayer);
            Assert.IsNotNull(tournament);

            Assert.AreEqual(tournament.ToString(), name);
        }

        [TestMethod]
        public void Count()
        {
            int cnt1 = tournamentDao.Count();
            Assert.IsTrue(cnt1 >= 0);
            tournamentDao.Insert(new Tournament("name", testPlayer));

            int cnt2 = tournamentDao.Count();
            Assert.AreEqual(cnt1 + 1, cnt2);
        }

        [TestMethod]
        public void FindAll()
        {
            int foundInitial = tournamentDao.FindAll().Count;
            int cntInitial = tournamentDao.Count();
            Assert.AreEqual(foundInitial, cntInitial);

            const int insertAmount = 10;

            for (var i = 0; i < insertAmount; ++i)
            {
                Tournament tournament = new Tournament("name", testPlayer);
                tournamentDao.Insert(tournament);
            }
            int cntAfterInsert = tournamentDao.Count();
            Assert.AreEqual(insertAmount + foundInitial, cntAfterInsert);

            int foundAfterInsert = tournamentDao.FindAll().Count;
            Assert.AreEqual(cntAfterInsert, foundAfterInsert);
        }

        [TestMethod]
        public void Insert()
        {
            int cnt = tournamentDao.Count();
            var tournament = new Tournament("name", testPlayer);
            var tournamentId = tournamentDao.Insert(tournament);
            int newCnt = tournamentDao.Count();
            Assert.AreEqual(cnt + 1, newCnt);
            Assert.IsInstanceOfType(tournamentId, typeof(int));
            Assert.IsTrue(tournamentId >= 0);
            Assert.AreEqual(tournamentId, tournament.TournamentId);
        }

        [TestMethod]
        public void InsertWithoutPlayerIdFails()
        {
            var player = new Player("", "", "", "", "", false, false,
                                false, false, false, false, false, false, null);

            try
            {
                tournamentDao.Insert(new Tournament("name", player));
                Assert.Fail("No ArgumentException thrown.");
            }
            catch (ArgumentException)
            { }
        }

        [TestMethod]
        public void Update()
        {
            var tournament = new Tournament("name", testPlayer);

            int tournamentId = tournamentDao.Insert(tournament);

            var newName = "newName";
            tournament.Name = newName;
            tournamentDao.Update(tournament);

            tournament = tournamentDao.FindById(tournamentId);
            Assert.AreEqual(newName, tournament.Name);
        }

        [TestMethod]
        public void UpdateWithoutPlayerIdFails()
        {
            Player player = playerDao.FindById(0);
            if (player == null)
            {
                player = new Player("first", "last", "nick", "us7er", "pass",
                    false, false, false, false, false, true, true, true, null);
                playerDao.Insert(player);
                player.PlayerId = null;
            }

            try
            {
                tournamentDao.Update(new Tournament("name", player)); // should throw ArgumentException
                Assert.Fail("ArgumentException not thrown for invalid Player.Update()");
            }
            catch (ArgumentException)
            { }
        }
    }
}