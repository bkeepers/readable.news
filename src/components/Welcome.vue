<script setup>
import FeedIcon from './FeedIcon.vue'
import NewsIcon from './NewsIcon.vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowLongRightIcon, LinkIcon, EnvelopeIcon, WindowIcon, DeviceTabletIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/solid'
import { useStorage } from '@vueuse/core'

const open = useStorage('showWelcome', true)
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-xl p-8 sm:p-12">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
                  <NewsIcon class="h-6 w-6 text-sky-100" aria-hidden="true" />
                </div>
                <div>
                  <DialogTitle as="h1" class="text-center my-3 sm:my-5">
                    <div class="text-slate-400 uppercase tracking-widest text-2xl">Welcome to</div>
                    <div class="text-sky-500 font-bold text-4xl">Readable News</div>
                  </DialogTitle>


                  <DialogDescription class="my-10 text-center">
                    <ol class="text-sm text-slate-500 flex-1 flex place-content-center">
                      <li class="flex-1 flex flex-col gap-6 place-items-center">
                        <div class="h-20 flex gap-2 place-items-center relative">
                          <img src="https://news.ycombinator.com/y18.svg" class="w-12 h-12 rounded saturate-0 opacity-50" />
                          <div class="flex flex-col relative">
                            <div class="relative">
                              <LinkIcon class="w-3 h-3 text-slate-400" />
                            </div>
                            <div class="relative">
                              <LinkIcon class="w-3 h-3 text-slate-400" />
                            </div>
                            <div class="relative">
                              <LinkIcon class="w-3 h-3 text-slate-400" />
                            </div>
                          </div>
                        </div>
                        <div class="-mr-2 text text-lg font-medium">Social News</div>
                      </li>
                      <li class="flex-none w-8 h-20 flex place-content-center"><ArrowLongRightIcon class="w-full text-slate-200"/></li>
                      <li class="flex-1 flex flex-col gap-6">
                        <div class="h-20 relative">
                          <div class="w-16 h-20 border rounded bg-white shadow p-2 mx-auto">
                            <div class="bg-slate-200 rounded-sm h-5 mb-[3px] mx-auto" style="width: 100%;"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:95%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:90%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:97%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:55%"></div>

                            <div class="bg-slate-300 rounded-sm h-[3.5px] mb-[3px] mt-[6px]" style="width:50%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:94%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:100%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:96%"></div>
                            <div class="bg-slate-200 rounded-sm h-[2px] mb-[2px]" style="width:60%"></div>
                          </div>
                        </div>
                        <div class="-mx-2 text-lg font-medium">Made Readable</div>
                      </li>
                      <li class="flex-none w-8 h-20 flex place-content-center"><ArrowLongRightIcon class="w-full text-slate-200"/></li>
                      <li class="flex-1 flex flex-col gap-6">
                        <div class="h-20 w-20 grid grid-cols-2 mx-auto place-items-center place-content-center">
                          <WindowIcon class="w-9 h-9 text-slate-300" />
                          <DeviceTabletIcon class="w-7 h-7 text-slate-300" />
                          <FeedIcon class="w-6 h-6 text-slate-300" />
                          <EnvelopeIcon class="w-8 h-8 text-slate-300" />
                        </div>
                        <div class="-ml-2 text-lg font-medium">For You</div>
                      </li>
                    </ol>
                  </DialogDescription>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                  class="block w-2/3 mx-auto justify-center rounded-md bg-sky-500 p-3 my-4 text-sm font-semibold text-white shadow-sm hover:shadow hover:bg-sky-400 focus:outline-sky-300"
                  @click="open = false">Start Reading</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
