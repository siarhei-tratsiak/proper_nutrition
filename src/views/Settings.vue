<template>
  <div class="align-start d-flex flex-lg-nowrap flex-wrap justify-center">
    <UserData />
    <DailyIntake />
  </div>
</template>

<script>
import DailyIntake from '@/components/settings/dailyIntake/DailyIntake'
import UserData from '@/components/settings/userData/UserData'

export default {
  components: {
    DailyIntake,
    UserData
  }
}
</script>
