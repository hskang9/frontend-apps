pub const contract: & 'static str = "contract
========

  As you saw in the description of [defconstrainedfn] core.contracts
  allows you to create functions with a localized and dependent
  contract.  However, there may be circumstances where the separation of
  contract and constrained function is preferred.  Take for example, a
  simple slope function:\n However, this constraint definition for sqr, while accurate, is very
  broad.  In fact, the software team developing software for the 8-bit
  Atari console would not be able to use constrained-sqr as it is far
  too liberal.  Therefore, they can define their own contract that
  further constrains constrained-sqr: \n
  And all appears to be in order -- except: \n
  That is, calling the function sqr-8bit with 100 causes a
  post-condition failure!  The reason for this is because the
  underlying sqr is the same old arbitrary-precision version when what
  we really want is a function that deals in only 8-bit values.  There
  are two possible ways to do this:\n
  1. Create a version of sqr-8bit that does in fact deal in 8-bit
  values\n
  2. Tighten the constraint on constrained-sqr further by applying\n
  Using contract and with-constraints you were able to tighten the
  constraints on both the pre- and post-conditions of the sqr
  function.  However, what if you wanted to relax the requirements? 
  Stay tuned.\n";