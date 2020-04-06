'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('catalogue controller', function () {

    describe('The ability for a patient to view a prescribed list of exercises', function () {
        beforeEach(function () {
            browser().navigateTo('/exerciselist/59eb0c3b42a9fa8b47870ff72cbacabf');
        });

        it('should render patient exercise list screen when user clicks on the link', function () {
            expect(element('#programnotes').text()).
                toMatch("Program notes");
        });

        it('should display a list of exercises', function () {
            sleep(1)
            expect(repeater('.exer', "Exercises").count()).toBeGreaterThan(0)
        })

        it('should display practitioner data for patient', function () {
            sleep(1)
            expect(binding('practitioner.clinic.name + ' - ' + practitioner.clinic.phone')).toMatch('IndustrieIT - 0435519526')
            expect(binding("exerciseList.practitioner.name")).toMatch('Thomas Bunting')
            expect(binding("practitioner.clinic.address")).toMatch('2 tea tree place')
        })
    });
});
