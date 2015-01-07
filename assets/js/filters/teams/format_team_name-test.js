describe('uniform.filters.teams', function() {
  beforeEach(module('uniform.filters.teams'));

  beforeEach(inject(function (formatTeamNameFilter) {
    this.formatTeamNameFilter = formatTeamNameFilter;
  }));

  describe('formatTeamName filter', function() {
    it('should return gender level sport', function() {
      var team = {
        gender: 'Girls',
        level: 'Varsity',
        sport: {
          name: 'Kick Boxing'
        }
      };

      expect(this.formatTeamNameFilter(team)).toBe('Girls Varsity Kick Boxing');
    });
  });
});
